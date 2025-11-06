const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
  
  return sum;
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  let mostLiked = blogs[0];

  if (blogs.length > 1) {
    for (let i = 1; i < blogs.length; i++) {
      if (blogs[i].likes > mostLiked.likes) {
        mostLiked = blogs[i];
      }
    }
  }
  
  return mostLiked;
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  let mostBlogs = {author: "", blogs: 0};
  let blogCount = [{author: blogs[0].author, blogs: 1}];

  if (blogs.length === 1) {
    mostBlogs.author = blogs[0].author;
    mostBlogs.blogs = 1;
  } else {
    for (let i = 1; i < blogs.length; i++) {
      const authorExists = blogCount.find(blog => blog.author === blogs[i].author);

      if (authorExists) {
        authorExists.blogs += 1;
      } else {
        blogCount.push({author: blogs[i].author, blogs: 1});
      }
    }
  }

  for (const blog of blogCount) {
    if(blog.blogs > mostBlogs.blogs) {
      mostBlogs = blog;
    }
  }
  
  return mostBlogs;
}


const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  let mostLikes = {author: "", likes: 0};
  let likesCount = [{author: blogs[0].author, blogs: blogs[0].likes}];

  if (blogs.length === 1) {
    mostLikes.author = blogs[0].author;
    mostLikes.likes = blogs[0].likes;
  } else {
    for (let i = 1; i < blogs.length; i++) {
      const authorExists = likesCount.find(blog => blog.author === blogs[i].author);

      if (authorExists) {
        authorExists.likes += blogs[i].likes;
      } else {
        likesCount.push({author: blogs[i].author, likes: blogs[i].likes});
      }
    }
  }

  for (const author of likesCount) {
    if(author.likes > mostLikes.likes) {
      mostLikes = author;
    }
  }
  
  return mostLikes;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}