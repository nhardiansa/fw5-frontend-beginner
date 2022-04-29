import Swal from "sweetalert2";

export default function customAlert(message, type) {
  Swal.fire({
    icon: "error",
    text: "Do you want to continue",
    title: "Error",
    confirmButtonText: "Cool"
  });
}
