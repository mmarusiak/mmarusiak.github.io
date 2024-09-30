var interactive = true;

const interactiveElements = document.getElementById('interactive');
const pdfElements = document.getElementById('pdf');

const navInt = document.getElementById('nav-int');
const navRes = document.getElementById('nav-res');

const navMain = document.getElementById('main-page');

function changeDisplay(targetState){
    interactive = targetState;
    interactiveElements.className = "interactive-" + interactive;
    pdfElements.className = "pdf-" + !interactive;
}

navInt.addEventListener('click', function(){
    navInt.className = 'nav-resume-pressed';
    navRes.className = 'nav-resume-inter';
    changeDisplay(true);
});

navRes.addEventListener('click', function(){
    navInt.className = 'nav-resume-inter';
    navRes.className = 'nav-resume-pressed';
    changeDisplay(false);
});

navMain.addEventListener('click', function(){
    window.location.href = './';
});