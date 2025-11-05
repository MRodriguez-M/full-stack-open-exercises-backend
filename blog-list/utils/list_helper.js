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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}