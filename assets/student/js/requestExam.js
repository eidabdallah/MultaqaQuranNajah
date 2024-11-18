const examPatternRadios = document.querySelectorAll(".partExam");
const selectElement = document.getElementById("examRange");

function updateSelectOptions(pattern) {
    selectElement.innerHTML = '<option value="" disabled selected>اختر النطاق</option>';
    let start = 1;
    let step = parseInt(pattern);

    while (start <= 30) {
        let end = Math.min(start + step - 1, 30);
        selectElement.innerHTML += `<option value="${start}-${end}">${start} - ${end}</option>`;
        start += step;
    }
}
examPatternRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
        updateSelectOptions(e.target.value);
    });
});
