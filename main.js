function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  
  
  var getAllRecords = function() {
    $.getJSON('https://api.airtable.com/v0/app70EWkzBewp8o9L/Table%201?api_key=keyNY6bTVL3myySSg',
      function(airtable){
        var html = [];
        $.each(airtable.records, function(index, record) {
          var id = record.id;
          var name = record.fields['Movie'];
          var summary = record.fields['Summary'];
          var picture = record.fields['Picture'];
          html.push(listView(id,name,summary, picture));
        });
        $('.list-view').append(html);
      }
    );
  }
  
  var getOneRecord = function(id) {
    $.getJSON(`https://api.airtable.com/v0/app70EWkzBewp8o9L/Table%201/${id}?api_key=keyNY6bTVL3myySSg`,
      function(record){
        var html = [];
        var name = record.fields['Movie'];
        var summary = record.fields['Summary'];
        var picture = record.fields['Picture'];
        var date = record.fields['Release'];
        var studio = record.fields['Studio'];
        var rating = record.fields['Rating'];
        var time = record.fields['Duration'];
        
        html.push(detailView(name,summary,picture,date,studio,rating,time));
        $('.list-view').append(html);
      }
    );
  }
  
  var listView = function(id,name,summary,picture) {
    return `
 
  
  <div class="card mb-3" >
  <div class="row no-gutters">
    <div class="col-md-4">
    ${picture ? `<img style="width:inherit;height:inherit;" src="${picture[0].url}">`: ``}
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${summary}</p>
        <a class="btn btn-primary" href="index.html?id=${id}" role="button">Link</a>
      </div>
    </div>
  </div>
</div>
  `;
  }
  
  
  var detailView = function(name,summary,picture,date,studio,rating,time) {
    return `
    <section>
    <br>
    <br>
    <div class="card" id="list-card" style="width: 100%;">
    <h5 class="card-title">${name}</h5>
    ${picture ? `<img id="detail-img" src="${picture[0].url}">`: ``}
    <div class="card-body">
      <p class="card-text">${summary}</p>
      <ul class="list-group list-group-flush">
    <li class="list-group-item">${date}</li>
    <li class="list-group-item">${rating}</li>
    <li class="list-group-item">${studio}</li>
    <li class="list-group-item">${time}</li>
  
  </ul>
    </div>
  </div>
    
    </section>


    `;
  }
  
  var id = getParameterByName('id');
  if (id) {
    getOneRecord(id);
  } else {
    getAllRecords();
  }

  