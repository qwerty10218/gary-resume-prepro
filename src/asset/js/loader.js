document.addEventListener('DOMContentLoaded', function () {
  // 取得進度條、進度文字和載入畫面的元素
  const progressBar = document.querySelector('.progress-bar');
  const progressText = document.querySelector('.progress-text');
  const loader = document.querySelector('.loader');

  let totalResources = 0;  // 總資源數量（如圖片、文件等）
  let loadedResources = 0;  // 已加載資源數量

  // 定義更新進度條的函式
  const updateProgress = () => {
    // 計算進度
    const progress = (loadedResources / totalResources) * 100;
    progressBar.style.width = `${progress}%`;  // 更新進度條寬度
    progressText.textContent = `${Math.round(progress)}%`;  // 更新進度文字顯示

    // 當進度達到或超過100%時，停止進度更新
    if (progress >= 100) {
      setTimeout(() => {
        loader.style.opacity = '0';  // 開始淡出
        setTimeout(() => {
          loader.style.display = 'none';  // 載入畫面完全隱藏
        }, 500);  // 等待500ms再隱藏元素
      }, 200);  // 進度條到100%後稍微停留200ms
    }
  };

  // 檢查頁面中的所有圖片並更新進度
  const images = document.querySelectorAll('img');
  totalResources += images.length;  // 計算總共需要加載的圖片數量

  images.forEach(img => {
    img.onload = () => {
      loadedResources++;  // 當圖片加載完成，已加載資源數量增加
      updateProgress();  // 更新進度條
    };

    img.onerror = () => {
      loadedResources++;  // 若圖片加載失敗，仍然算作已加載
      updateProgress();  // 更新進度條
    };

    // 預先載入圖片
    if (img.src) {
      img.src = img.src;
    }
  });

  // 監聽其他資源（如JavaScript、CSS）的加載
  const resources = document.querySelectorAll('link[rel="stylesheet"], script');
  totalResources += resources.length;  // 計算總共需要加載的其他資源數量

  resources.forEach(resource => {
    resource.onload = () => {
      loadedResources++;
      updateProgress();
    };

    resource.onerror = () => {
      loadedResources++;
      updateProgress();
    };

    // 預先載入資源
    if (resource.href || resource.src) {
      const isStyleSheet = resource.rel === 'stylesheet';
      const isScript = resource.tagName.toLowerCase() === 'script';
      if (isStyleSheet && resource.href) {
        resource.href = resource.href;
      } else if (isScript && resource.src) {
        resource.src = resource.src;
      }
    }
  });

  // 更新初始進度條
  updateProgress();  // 初始化一次進度條
});
