// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

// Listen for the scroll event and log the event data
// lenis.on('scroll', (e) => {
//   console.log(e);
// });


// Navbar
let isNavOpened = false;
const $nav = document.querySelector('.c-nav');
const $burger = document.querySelector('.o-burger');
// $burger.addEventListener('click', function() {
//   //
// });

function toggleNav() {
  // !isNavOpened 如果是關閉狀態
  if (!isNavOpened) {
    lenis.stop();
    $nav.classList.add('is-opened');
    $burger.classList.add('is-opened');
    isNavOpened = true;
  } else {
    // 開啟狀態的話，就移除 .is-opened
    lenis.start();
    $nav.classList.remove('is-opened');
    $burger.classList.remove('is-opened');
    isNavOpened = false;
  }
}
// 解決 nav 打開時，又把視窗拉大到 nav 消失
// 會因為 lenis.stop(); 造成無法滾動
// 假設 md 才變漢堡選單，要把斷點改成 992px
window.matchMedia('(min-width: 1400px)').addEventListener('change', function(e) {
  // isNavOpened 才有執行動作的必要
  if (isNavOpened) {
    // 如果斷點符合
    if (e.matches) lenis.start();
    else lenis.stop();
  }
});

// 圖片還沒載入時的預設圖
const $lazyImgs = document.querySelectorAll('img.js-lazy');
$lazyImgs.forEach(function(item) {
  // https://png-pixel.com/
  item.setAttribute(
    'src',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAAEElEQVR42mNc/58BDBgxGABS/gUOHYfjMQAAAABJRU5ErkJggg=='
  );
});
const lazyLoad = new LazyLoad({
  // 自訂義 BEM class
  elements_selector: '.js-lazy',
  // 設定距離可視區(視窗)底部多遠觸發，官方預設是 300
  threshold: 500
});

// // 滾動至 news 時改變背景顏色
// const $body = document.body;
// const $news = document.querySelector('.l-home-news');
// // 在沒有 .l-home-news 的頁面才不會出錯
// if ($news !== null) {
//   window.addEventListener('scroll', function() {
//     // console.log($news.getBoundingClientRect().top);
//     // $news.getBoundingClientRect().top => news 頂到視窗上緣後會是負數
//     const newsTop = $news.getBoundingClientRect().top;
//     const start = newsTop < 100;
//     // $news.offsetHeight => news 元素的高
//     // console.log(newsTop, $news.offsetHeight)
//     const end = newsTop * -1 < $news.offsetHeight / 3
//     // console.log(this);
//     if (start && end) {
//       $body.classList.add('is-news-active');
//     } else {
//       $body.classList.remove('is-news-active');
//     }
//   });
// }