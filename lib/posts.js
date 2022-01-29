import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

//El directorio de los posts se trae del current working directory + 'posts'
const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  //Traer los nombres de los achivos de /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    //Remover ".md" del nombre del archivo para tenerlo como id
    const id = fileName.replace(/\.md$/, '');

    //Leer el archivo markdown como string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    //Usar gray-matter para formatear el string
    const matterResult = matter(fileContents);

    //Combinar la info con el id
    return {
      id,
      ...matterResult.data,
    };
  });

  //Ordenar posts por dia

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  //Usar remark para convertir markdown a html
  const parsedContent = await remark().use(html).process(matterResult.content);

  const contentHtml = parsedContent.toString();

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
