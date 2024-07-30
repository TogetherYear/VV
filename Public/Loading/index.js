const loading = document.querySelector('#Loading')
const app = document.querySelector('#App')

window.ShowLoading = () => {
    app.style.opacity = '0'
    loading.style.opacity = '1'
    loading.style.pointerEvents = 'all'
}

window.HideLoading = () => {
    app.style.opacity = '1'
    loading.style.opacity = '0'
    loading.style.pointerEvents = 'none'
}