$(document).ready(function () {
    console.log("window loaded");
    $.ajax({
        url: "/getskills/",
    }).done(function (data) {
        for (let index = 0; index < 100; index++) {
            $("#xpul").append(`<li>
            <div class="category-card__organization entity-picture entity-picture--is-hexagon">
            <div class="hexagon-border hexagon-border--no-margins"></div>
                    <div
                        class="entity-picture__thumbnail entity-picture__thumbnail--text entity-picture__thumbnail--no-margins">
                        <span>${data.exps[index][1]}</span>
                        </div>
                        </div>
                <a target="_blank" href="https://torre.co/en/search/jobs?q=skill%2Frole%3A${data.exps[index][0]}">${data.exps[index][0]}</a>
            </li>`)
            $("#ptdul").append(`<li>
            <div class="category-card__organization entity-picture entity-picture--is-hexagon">
            <div class="hexagon-border hexagon-border--no-margins"></div>
                    <div
                        class="entity-picture__thumbnail entity-picture__thumbnail--text entity-picture__thumbnail--no-margins">
                        <span>${data.ptds[index][1]}</span>
                        </div>
                        </div>
                <a target="_blank" href="https://torre.co/en/search/jobs?q=skill%2Frole%3A${data.ptds[index][0]}">${data.ptds[index][0]}</a>
            </li>`)

        }
    });
});