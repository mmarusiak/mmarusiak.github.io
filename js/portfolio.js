const allQuickLinks = document.getElementsByClassName('quick-link');
const moreInfoElement = document.getElementById('more-info');

const moreInfoHovers = document.getElementsByClassName('mi');

for (link of allQuickLinks) {
    const linkValue = link.dataset.link_var;
    link.addEventListener('click', function () {
        window.location.href = linkValue;
    });
}

for (info of moreInfoHovers){
    const infoValue = info.dataset.info_var;
    const yposElement = info.getBoundingClientRect().bottom;
    info.addEventListener('mouseover', function(event){
        var x = event.clientX;
        console.log(infoValue);
        moreInfoElement.textContent = infoValue;
        moreInfoElement.classList.add("info-hovered");
        moreInfoElement.style.left = x - moreInfoElement.offsetWidth/2 + 'px';
        moreInfoElement.style.top = yposElement + 'px';
    });
    info.addEventListener('mouseleave', function(){
        moreInfoElement.classList.remove("info-hovered");
    });
}

