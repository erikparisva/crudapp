
$("#edit_task").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    var request = {
        "url":`http://localhost:3000/api/tasks/${data.id}`,
        "method": "PUT",
        "data":data
    }

    $.ajax(request).done(function(response){
        alert("Data updated successfully!")
    })
})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url":`http://localhost:3000/api/tasks/${id}`,
            "method": "DELETE"
        }

        if(confirm("Are you sure you want to delete this task?")){
            $.ajax(request).done(function(response){
                alert("Data deleted successfully!")
                location.reload();
            })
        }
    })
}