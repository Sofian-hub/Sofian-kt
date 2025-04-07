document.addEventListener("DOMContentLoaded", function () {
    const textContainer = document.querySelector(".text-container");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                textContainer.classList.remove("restart-animation");
                void textContainer.offsetWidth; // Force reflow
                textContainer.classList.add("restart-animation");
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(textContainer);
});

document.getElementById("my_modal_2").addEventListener("change", function() {
    let calculator = document.getElementById("calculator");
    
    if (this.checked) {
        calculator.classList.remove("hidden");
    } else {
        calculator.classList.add("hidden");
    }
});
document.querySelector("button[onclick='my_modal_2.showModal()']").addEventListener("click", function() {
    document.getElementById("calculator").classList.remove("hidden");
});
