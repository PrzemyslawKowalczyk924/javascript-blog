'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorsLink: Handlebars.compile(document.querySelector('#template-authors-link').innerHTML),
};

const opt = {
  ArticleSelector: '.post',
  TitleSelector: '.post-title',
  TitleListSelector: '.titles',
  ArticleTagsSelector: '.post-tags .list',
  ArticleAuthorSelector: '.post-author',
  TagsListSelector: '.tags.list',
  CloudClassCount: 5,
  CloudClassPrefix: 'tag-size-',
  AuthorsListSelector: '.authors'
};

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

function generateTitleLinks(customSelector = '') {
  /*remove contents of titleList*/
  const titleList = document.querySelector(opt.TitleListSelector);
  titleList.innerHTML = '';

  /*find all articles and save them to variable: articles*/
  const articles = document.querySelectorAll(opt.ArticleSelector + customSelector);

  let html = '';

  /*for each article*/
  for (let article of articles) {
    /*get the article id*/
    const articleId = article.getAttribute('id');
    /*find the title element*/
    const articleTitle = article.querySelector(opt.TitleSelector).innerHTML;
    /*create html of the link*/
    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    //titleList.insertAdjacentHTML('beforebegin', linkHTML);
    /*insert link into titleList*/
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  console.log('params:', params);
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opt.CloudClassCount - 1) + 1);
  return classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(opt.ArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsList = article.querySelector(opt.ArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTMLData = {id: 'tag-' + tag, title: tag};
      const linkHTML = templates.articleLink(linkHTMLData);
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */

      /* [NEW] find list of tags in right column */
      const tagList = document.querySelector('.tags');

      const tagsParams = calculateTagsParams(allTags);
      /* [NEW] create variable for all links HTML code */
      const allTagsData = {tags: []};
      /* [NEW] START LOOP: for each tag in allTags: */
      for (let tag in allTags) {
        console.log(tag);
        /* [NEW] generate code of a link and add it to allTagsHTML */
        allTagsData.tags.push({
          tag: tag,
          count: allTags[tag],
          className: calculateTagClass(allTags[tag], tagsParams)
        });
      }
      /* [NEW] END LOOP: for each tag in allTags: */

      /*[NEW] add HTML from allTagsHTML to tagList */
      tagList.innerHTML = templates.tagCloudLink(allTagsData);
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = html;

    /* END LOOP: for every article: */
  }
}

generateTags();

const tagClickHandler = function (event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTagLinks) {
    /* remove class active */
    activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  let foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let foundTagLink of foundTagLinks) {
    /* add class active */
    foundTagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
};

function addClickListenersToTags() {
  /* find all links to tags */
  const links = document.querySelectorAll('.post-tags .list a, .list.tags a');
  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  /*[NEW] add object for all authors*/
  let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(opt.ArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const authorList = article.querySelector(opt.ArticleAuthorSelector);
    /* make html variable with empty string */
    let html = '';
    /* get author from post-author class */
    const articleAuthor = article.getAttribute('data-author');
    /* generate HTML of the link */
    const linkHTMLData = {id: 'author-' + articleAuthor, title: articleAuthor};
    const linkHTML = templates.articleLink(linkHTMLData);
    /* add generated code to html variable */
    html = html + linkHTML;

    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors[articleAuthor]) {
      /* [NEW] add tag to allAuthors object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    /* [NEW] find list of tags in right column */
    const listofAuthors = document.querySelector(opt.AuthorsListSelector);
    /* [NEW] create variable for all links HTML code */

    /* [NEW] START LOOP: for each author in allAuthors: */
    const allAuthorsData = {authors: []};
    for (let author in allAuthors) {
      /* [NEW] generate code of a link and add it to allAuthorsHTML */
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
      });
    }
    /*[NEW] Add insert HTML of all authors to right barside*/
    listofAuthors.innerHTML = templates.authorsLink(allAuthorsData);

    /* insert HTML of all the links into the tags wrapper */
    authorList.innerHTML = html;
    /* END LOOP: for every article: */
  }
}

generateAuthors();

const authorClickHandler = function (event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  /* find all tag links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active tag link */
  for (let activeAuthorList of activeAuthorLinks) {
    /* remove class active */
    activeAuthorList.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  let foundAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let foundAuthorLink of foundAuthorLinks) {
    /* add class active */
    foundAuthorLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
};

function addClickListenersToAuthors() {
  /* find all links to tags */
  const links = document.querySelectorAll('.list.authors a, .post-author a');
  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();
