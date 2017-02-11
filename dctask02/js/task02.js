var globalData ;

function displayData(data) {
    var tableBody = $('#movieTableBody');
    $.each(data.Movies,function (count, movie) {
        tableBody.append(`<tr data-toggle="collapse" data-target="#movie${count+1}"><td>${count+1}</td><td>${movie.Title}</td></tr>`);
        var propertyLines = '';
        $.each(Object.keys(movie), function (count, propertyName) {
            if(propertyName!='Title')
                propertyLines+=`<li>${propertyName} - ${movie[propertyName]}</li>`
        });
        tableBody.append(`<tr><td class="hidderRow" colspan="2"><div class="accordian-body collapse" id="movie${count+1}"><ul>${propertyLines}</ul></div></td></tr>`);
    })
}

function cleanDisaply() {
    $('#movieTableBody').html('');
    $('#searchPattern').val('');
}

jQuery(function () {


    $('#search').click(function (e) {
        e.preventDefault();
        var searchPattern = $('#searchPattern').val();
        if(searchPattern.length>0){
            var result = $.grep(globalData.Movies,function (movie, count) {
                console.log(movie)
                return movie.Title.match(searchPattern);
            })
            cleanDisaply();
            var resultAdapter = {Movies: result};
            displayData(resultAdapter)
        }else{
            displayData(globalData)
        }
        return false;
    });


    $.getJSON('code_test_data.json')
        .done(function (data) {
            globalData = data ;
            displayData(globalData) ;
        });
});
