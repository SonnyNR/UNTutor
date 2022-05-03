
const PersonalData = ({name, email, phone}) => {

  return (
    <div>
      <table>
          <tr>
              <td>Nombre:</td>
              <td>{name}</td>
          </tr>
          <tr>
              <td>Correo:</td>
              <td>{email}</td>
          </tr>
          <tr>
              <td>Celular:</td>
              <td>{phone}</td>
          </tr>
      </table>
    </div>
  );

}

export default PersonalData;
