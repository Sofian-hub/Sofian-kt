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
