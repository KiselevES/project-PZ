document.addEventListener("DOMContentLoaded", () => {
    function setContentHeight() {
        const header = document.querySelector('.header');
        const wrapper = document.querySelector('.wrapper');
        const footer = document.querySelector('.footer');
        const setHeightContainer = document.querySelector('.set-height');
        const neededHeight = wrapper.offsetHeight - header.offsetHeight - footer.offsetHeight;

        if (setHeightContainer.offsetHeight < neededHeight) {
            setHeightContainer.style.height = neededHeight + 'px';
        }
    }

    setContentHeight();
    window.addEventListener('resize', setContentHeight);
})


