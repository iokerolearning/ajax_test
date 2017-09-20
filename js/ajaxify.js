$(document).ready(function() {
  $("#cargando").hide();

  var cargarAlumnos = function() {
    $("#cargando").show();
    console.log("Limpiando tabla")
    $("#total-alumnos tbody").html("")
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
          $("#total-alumnos tbody").append(row)
        }
        $("#cargando").hide();
      },
    })
  }

  $("#total-alumnos #cargar-alumnos").on("click", cargarAlumnos)
  
});
