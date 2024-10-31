const allQuickLinks = document.getElementsByClassName('quick-link');

for (link of allQuickLinks) {
    const link_value = link.dataset.link_var;
    link.addEventListener('click', function () {
        window.location.href = link_value;
    });
}
