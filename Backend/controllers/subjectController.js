// exports.getPredefinedSubjects = (req, res) => {
//   const allowedInterests = [
//     "JavaScript",
//     "Python",
//     "Java",
//     "C++",
//     "C#",
//     "Ruby",
//     "Go",
//     "Rust",
//     "TypeScript",
//     "SQL",
//     "HTML",
//     "CSS",
//     "React",
//     "Angular",
//     "Vue.js",
//     "Node.js",
//     "Django",
//     "Flask",
//     "Spring",
//     "Machine Learning",
//     "Data Science",
//     "Artificial Intelligence",
//     "Blockchain",
//     "DevOps",
//     "Cloud Computing",
//     "Kubernetes",
//     "Docker",
//     "AWS",
//     "Azure",
//     "Google Cloud",
//     "Cybersecurity",
//   ];

//   res.json(allowedInterests);
// };
// controllers/subjectController.js
export const getPredefinedSubjects = (req, res) => {
  const allowedInterests = [
    "JavaScript", "Python", "Java", "C++", "C#", "Ruby", "Go", "Rust", "TypeScript", "SQL",
    "HTML", "CSS", "React", "Angular", "Vue.js", "Node.js", "Django", "Flask", "Spring",
    "Machine Learning", "Data Science", "Artificial Intelligence", "Blockchain", "DevOps",
    "Cloud Computing", "Kubernetes", "Docker", "AWS", "Azure", "Google Cloud", "Cybersecurity",
  ];
  res.json(allowedInterests);
};
