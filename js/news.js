const latest_news = document.querySelector('.latest_news');

function newsPage(){
    const newsForMore = [];
    
    const news_blocks = latest_news.querySelectorAll('.news_block');
    const more_link = document.querySelector(".more_link");

    news_blocks.forEach((item) => {
        newsForMore.push(item.outerHTML);
    })
    
    more_link.addEventListener("click", (event) => {
        if(!newsForMore.length){
            more_link.classList.add('hidden');
            return;
        }
        const item = newsForMore.shift();
        latest_news.insertAdjacentHTML("beforeEnd", item);
    });
}

newsPage();


