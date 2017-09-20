$(document).ready(function() {
  $("#cargando").hide();
  $(".messages").hide();

  var cargarAlumnos = function() {
    $("#cargando").show();
    console.log("Limpiando tabla")
    $("#alumnos tbody").html("")
    console.log("Se inicia la carga de alumnos...")
    $.ajax({
      url: 'http://learning1.iokero.com/alumnos.json',
      success: function(response) {
        console.log("Data del servidor");
        console.log(response)
        for(i in response){
          var alumno = response[i]
          var row = alumnoRow.replace("_id_", alumno.id).
            replace("_nombres_", alumno.nombres).replace("_apellidos_", alumno.apellidos).
            replace("_codigo_", alumno.codigo)
          $("#alumnos tbody").append(row)
        }
        $("#cargando").hide();
      },
    })
  }

  $("#alumnos #cargar-alumnos").on("click", cargarAlumnos)
  $("#alumnos form").submit(function(event) {
    $(".messages").hide();
    event.preventDefault();
    $.ajax({
      url: 'http://learning1.iokero.com/alumnos.json',
      type : "POST",
      dataType : 'json',
      data : $("#alumnos form").serialize(),
      success : function(result) {
        var row = alumnoRow.replace("_id_", result.id).
          replace("_nombres_", result.nombres).replace("_apellidos_", result.apellidos).
          replace("_codigo_", result.codigo)
        $("#alumnos tbody").append(row)
      },
      error: function(xhr) {
        if(xhr.status == 422){
          $(".messages .alert").html("")
          $(".messages .alert").append("<strong>Error</strong>" + xhr.responseText)
          $(".messages").show()
        }
      }
    })

  });
});
