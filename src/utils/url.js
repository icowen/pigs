export default url =
  process.env.NODE_ENV === "production"
    ? "https://pigs-resources.s3.amazonaws.com"
    : "http://127.0.0.1:8000/resources";
