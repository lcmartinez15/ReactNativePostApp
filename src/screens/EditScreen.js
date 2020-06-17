import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

const EditScreen = ({ navigation }) => {
  const { state, editBlogPosts } = useContext(Context);
  const id = navigation.getParam("id");
  const blogPost = state.find((blog) => blog.id === id);

  return (
    <BlogPostForm
      initialValues={blogPost}
      onSubmit={(title, content) => {
        editBlogPosts(id, title, content, () => navigation.pop());
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default EditScreen;
