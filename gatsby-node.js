const path = require('path');
// const {md} = require('./src/components/ArticleDetail/markdownIt');
const article_list = require('./src/articles/article_list.json');
const fs = require('fs');

exports.createPages = async ({actions}) => {
    const {createPage} = actions;
    const template = path.resolve(`./src/templates/post.js`);
    const articleList = JSON.parse(article_list);
    articleList.forEach(article_info => {
            let file_name = article_info['article_md_path'];
            let meta_title = article_info['article_title'];
            let meta_description = article_info['article_description'];
            let meta_image = article_info['article_cover_image_url'];
            let uuid = article_info['uuid'];
            let content = fs.readFileSync('./src/articles/' + file_name + '.md', 'utf8');
            createPage({
                path: `/blog/${article_info['uuid']}`,
                component: template,
                context: {
                    md_path: file_name,
                    title: meta_title,
                    description: meta_description,
                    image: meta_image,
                    uuid: uuid,
                    text: content
                },
            });
        }
    );
};