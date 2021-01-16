import React from "react";
import { Link } from "react-router-dom";

const IMG_URL_PATH = "http://localhost:4000/uploads/";

function TableRow(props) {
    // console.log("props child:",props);
  return (
    <tr>
      <td>
        {props.item.product_image ? (
          <img alt="demo"
            style={{ height: "50px" }}
            src={`${IMG_URL_PATH}${props.item.product_image}`}
            className="img-fluid"
          />
        ) : (
          "-"
        )}
      </td>
      <td>{props.item.product_name}</td>
      <td>{props.item.product_type}</td>
      <td>{props.item.product_has_discount ? "Yes" : "No"}</td>
      <td>{props.item.product_available_colors}</td>
      <td>{props.item.product_description}</td>
      <td>
        <Link to={"/edit/" + props.item._id} className="btn btn-primary">
          Edit
        </Link>
      </td>
      <td>
        <button onClick={() => props.func(props.item._id)} className="btn btn-danger">Delete</button>
      </td>
    </tr>
  );
}

export default TableRow;
