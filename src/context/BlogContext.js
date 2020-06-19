import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogPost":
      return action.payload;
    case "add_blogPost":
      return [
        ...state,
        {
          // id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case "delete_blogPost":
      return state.filter((blogPost) => blogPost.id !== action.payload);
    case "edit_blogPost":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });

    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts");
    dispatch({ type: "get_blogPost", payload: response.data });
  };
};
const addBlogPosts = (dispatch) => {
  return async (title, content, callback) => {
    const response = await jsonServer.post("/blogposts", { title, content });
    // dispatch({ type: "add_blogPost", payload: response });
    callback();
  };
};

const editBlogPosts = (dispatch) => {
  return async (id, title, content, callback) => {
    const response = await jsonServer.put(`/blogposts/${id}`, {
      title,
      content,
    });
    dispatch({ type: "edit_blogPost", payload: { id, title, content } });
    callback();
  };
};

const deleteBlogPosts = (dispatch) => {
  return async (id) => {
    const response = await jsonServer.delete(`/blogposts/${id}`);

    dispatch({ type: "delete_blogPost", payload: id });
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPosts, deleteBlogPosts, editBlogPosts, getBlogPosts },
  []
);
