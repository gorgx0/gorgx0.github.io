var globalData ;

function displayData(data) {
    var tableBody = $('#movieTableBody');
    $.each(data.Movies,function (count, movie) {
        tableBody.append(`<tr data-toggle="collapse" data-target="#movie${count+1}"><td>${count+1}</td><td>${movie.Title}</td></tr>`);
        var propertyLines = '';
        var poster = '';
        $.each(Object.keys(movie), function (count, propertyName) {
            if(propertyName!='Title'){
                if(propertyName==='Poster'){
                    poster = `<img src="${movie[propertyName]}">`;
                }else{
                    propertyLines+=`<li>${propertyName} - ${movie[propertyName]}</li>`
                }
            }
        });
        tableBody.append(`<tr>
                            <td class="hidderRow" colspan="2">
                                <div class="accordian-body collapse" id="movie${count+1}">
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <ul>${propertyLines}</ul>
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        ${poster}						
                                    </div>
                                </div>
                            </td>
                         </tr>`);
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
            cleanDisaply();
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
