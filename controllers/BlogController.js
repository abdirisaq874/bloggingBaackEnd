const Blogs = require('../models/Blog');
const Comments = require('../models/Comments');
const Mailing = require('../models/BlogMaillings');
const OpenAI = require('openai');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../Errors');

const { checkPermissions, sendNewBlogtoSubscribers } = require('../Utils');
const { default: slugify } = require('slugify');
const Employees = require('../models/Employees');

const OpenAiIntegration = async (prombt) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: prombt,
      },
    ],
    model: 'gpt-3.5-turbo',
  });
  return chatCompletion.choices[0].message.content;
};

const createBlog = async (req, res) => {
  const {
    title,
    thumbnailUrl,
    category,
    content,
    isFeatured,
    tags,
    keywords,
    description,
    minutesToRead,
  } = req.body;

  const EmployeeId = await Employees.findOne({ user: req.user.userId });
  const slug = slugify(title, { lower: true });

  if (!EmployeeId) {
    throw new CustomError.NotFoundError('No employee found');
  }
  const blog = await Blogs.create({
    title,
    thumbnailUrl,
    category,
    content,
    tags,
    keywords,
    description,
    minutesToread: minutesToRead,
    isfeatured: isFeatured,
    employee: EmployeeId.id,
    slug,
  });
  const maillings = await Mailing.find({});
  try {
    maillings.map(async (mail) => {
      await sendNewBlogtoSubscribers({
        title: blog.title,
        content: blog.content,
        origin: req.headers.origin,
        email: mail.email,
      });
    });
  } catch (err) {
    throw new CustomError.BadRequestError('error sending email');
  }

  res.status(StatusCodes.CREATED).json({ message: 'success! blog created' });
};
const getAllBlogs = async (req, res) => {
  const blogs = await Blogs.find({}).populate({
    path: 'employee',
    select: 'bio titleAtOrbiba description createdAt updatedAt',
    populate: {
      path: 'user',
      select: 'name avator',
    },
  });
  res.status(StatusCodes.OK).json({ blogs, count: blogs.length });
};
const getSingleBlog = async (req, res) => {
  const { slug } = req.params;
  console.log(slug);
  const blog = await Blogs.findOne({ slug: slug })
    .populate({
      path: 'employee',
      select: 'bio titleAtOrbiba description createdAt updatedAt',
      populate: {
        path: 'user',
        select: 'name avator',
      },
    })
    .populate({
      path: 'category',
      select: 'name',
    });

  // console.log(blog);

  // blog.user = employee;
  if (!blog) {
    throw new CustomError.NotFoundError(`No blog with slug ${req.params.slug}`);
  }

  const numoflikes = blog.likes.length;
  const comments = await Comments.countDocuments({ blog: blog._id });
  const views = blog.views;

  const customBlog = {
    ...blog._doc,
    articles: '56',
    followers: '1k+',
    feedback: {
      numoflikes,
      comments,
      views,
    },
  };

  blog.views += 1;
  blog.save();

  res.status(StatusCodes.OK).json({ blog: customBlog });
};
const updateBlog = async (req, res) => {
  const { id: blogId } = req.params;
  const { title, body } = req.body;
  const blog = await Blogs.findOne({ _id: blogId });
  if (!blog) {
    throw new CustomError.NotFoundError(`No blog with id ${blogId}`);
  }
  checkPermissions(req.user, blog.user);
  blog.title = title;
  blog.body = body;
  await blog.save();
  res.status(StatusCodes.OK).json({ blog });
};
const deleteBlog = async (req, res) => {
  const blog = await Blogs.findOne({ _id: req.params.id });
  if (!blog) {
    throw new CustomError.NotFoundError(`No blog with id ${req.params.id}`);
  }
  checkPermissions(req.user, blog.user);
  await blog.remove();
  res.status(StatusCodes.OK).json({ msg: 'success! blog removed' });
};

const ToggleLike = async (req, res) => {
  const { blogId } = req.params;
  const userId = req.user.userId;
  const blog = await Blogs.findById(blogId);
  if (!blog) {
    throw new CustomError.NotFoundError(`No blog with id ${blogId}`);
  }
  const isLiked = blog.likes.includes(userId);
  if (isLiked) {
    blog.likes = blog.likes.filter((id) => {
      return id.toString() !== userId;
    });
  } else {
    blog.likes.push(userId);
  }
  await blog.save();
  res.status(StatusCodes.OK).json({ blog });
};

const createComment = async (req, res) => {
  const { blogId } = req.params;
  const { content } = req.body;
  const userId = req.user.userId;

  const blog = await Blogs.findById(blogId);
  if (!blog) {
    throw new CustomError.NotFoundError(`No blog with id ${blogId}`);
  }
  const comment = await Comments.create({
    content,
    blog: blogId,
    user: userId,
  });
  res.status(StatusCodes.CREATED).json({ message: 'success! comment created' });
};
const getAllComments = async (req, res) => {
  const { blogId } = req.params;
  const page = parseInt(req.query.page) || 1; // Current page number
  const limit = parseInt(req.query.limit) || 10; // Number of comments per page

  const skip = (page - 1) * limit;

  const comments = await Comments.find({ blog: blogId })
    .populate({
      path: 'user',
      select: 'name email avator',
    })
    .skip(skip)
    .limit(limit);

  const totalComments = await Comments.countDocuments({ blog: blogId });
  const totalPages = Math.ceil(totalComments / limit);

  const response = {
    data: {
      comments,
      // currentUser: req.user.userId,
    },
    meta: {
      pagination: {
        total: totalComments,
        limit,
        page,
        totalPages,
      },
    },
  };
  res.status(StatusCodes.OK).json(response);
};

const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  const comment = await Comments.findOne({ _id: commentId });
  if (!comment) {
    throw new CustomError.NotFoundError(`No comment with id ${commentId}`);
  }
  checkPermissions(req.user, comment.user);
  comment.content = content;
  await comment.save();
  res.status(StatusCodes.OK).json({ message: 'success! comment updated' });
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const comment = await Comments.findOne({ _id: commentId });
  if (!comment) {
    throw new CustomError.NotFoundError(`No comment with id ${req.params.id}`);
  }
  checkPermissions(req.user, comment.user);
  await comment.deleteOne();
  res.status(StatusCodes.OK).json({ message: 'success! comment removed' });
};

const GenerateDescription = async (req, res) => {
  const { content } = req.body;
  const prombt = `generate seo optimized description, from this blog post, it starts from here "${content}" and ends from here "end of blog post", please in String format`;
  const description = await OpenAiIntegration(prombt);
  res.status(StatusCodes.OK).json({ description });
};

const GenerateKeywords = async (req, res) => {
  const { content } = req.body;
  const prombt = `generate seo optimized keywords, from this blog post, it starts from here "${content}" and ends from here "end of blog post", please in this format keywords:[a,b,c,d,e,f,g,h]`;
  const keywords = await OpenAiIntegration(prombt);
  res.status(StatusCodes.OK).json({ keywords });
};

const GenerateTags = async (req, res) => {
  const { content } = req.body;
  const prombt = `generate seo optimized tags, from this blog post,it starts from here "${content}" and ends from here "end of blog post", please in this format tags:[]`;
  const tags = await OpenAiIntegration(prombt);
  res.status(StatusCodes.OK).json({ tags });
};

const GenerateMinutesToRead = async (req, res) => {
  const { content } = req.body;
  const prombt = `generate minutes needed to read this blog, from this blog post, it starts from here "${content}" and ends from here "end of blog post", please in number format like, minutesToread: 4 or 5 or 16 `;
  const minutesToread = await OpenAiIntegration(prombt);
  res.status(StatusCodes.OK).json({ minutesToread });
};

const FetchLatesBlogs = async (req, res) => {
  const blogs = await Blogs.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .select('-content')
    .populate({
      path: 'employee',
      select: 'bio titleAtOrbiba description createdAt updatedAt',
      populate: {
        path: 'user',
        select: 'name avator',
      },
    })
    .populate({
      path: 'category',
      select: 'name',
    });
  res.status(StatusCodes.OK).json({ blogs });
};

const FetchBlogsByCategory = async (req, res) => {
  const { category } = req.params;
  const blogs = await Blogs.find({ category: category })
    .sort({ createdAt: -1 })
    .populate({
      path: 'employee',
      select: 'bio titleAtOrbiba description createdAt updatedAt',
      populate: {
        path: 'user',
        select: 'name avator',
      },
    })
    .populate({
      path: 'category',
      select: 'name',
    });
  res.status(StatusCodes.OK).json({ blogs });
};
module.exports = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  ToggleLike,
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
  GenerateDescription,
  GenerateKeywords,
  GenerateTags,
  GenerateMinutesToRead,
  FetchLatesBlogs,
};
