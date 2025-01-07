const loading = document.querySelector('#SplashLoading');

/**
 * 这个方法 还是预留着 以防备用 后面假如有用呢......
 */
window.ShowLoading = () => {
    loading.style.transition = 'all 0.0s';
    loading.style.opacity = '1';
    loading.style.pointerEvents = 'all';
};

window.HideLoading = () => {
    loading.style.transition = 'all 0.5s';
    loading.style.opacity = '0';
    loading.style.pointerEvents = 'none';
};
