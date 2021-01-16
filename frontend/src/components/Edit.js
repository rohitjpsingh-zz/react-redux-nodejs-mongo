import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getProduct,updateProduct } from "../actions/product";

const IMG_URL_PATH = "http://localhost:4000/uploads/";

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product_img_path: "",
      product_img: null,
      product_name: "",
      product_type: "",
      has_discount: "",
      available_colors: [],
      description: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount = async () => {
    // this.props.getProduct(this.props.match.params.id);
    try {
      await this.props.getProduct(this.props.match.params.id);

      const {
        product_image,
        product_name,
        product_type,
        product_has_discount,
        product_available_colors,
        product_description,
      } = this.props.product;

      this.setState({
        product_img_path: product_image,
        product_name: product_name,
        product_type: product_type,
        has_discount: product_has_discount ? "yes" : "no",
        available_colors: product_available_colors
          ? product_available_colors.split(",")
          : [],
        description: product_description,
      });
    } catch (err) {
      console.log("[ERROR]");
      console.log(err.message);
    }
  };


  handleInputChange(event) {
    const target = event.target;

    const type = target.type;
    const name = target.name;
    const value = target.value;
    console.log(
      `target type : ${type} | target name : ${name} | target value : ${value} | target.checked : ${target.checked}`
    );

    if (type === "checkbox") {
      if (target.checked) {
        this.setState(
          {
            available_colors: [...this.state.available_colors, target.value],
          },
          () => {
            console.log("available_colorsss", this.state.available_colors);
          }
        );
      } else {
        let remove = this.state.available_colors.indexOf(target.value);
        this.setState(
          {
            available_colors: this.state.available_colors.filter(
              (_, i) => i !== remove
            ),
          },
          () => {
            console.log("available_colorsss", this.state.available_colors);
          }
        );
      }

      /*
      Another Ways
      const available_colors = this.state.available_colors;
      if (target.checked) {
        available_colors.push(value);
      } else {
        let index = available_colors.indexOf(value);
        available_colors.splice(index, 1);
      }
      // update the state with the new array
      this.setState({ available_colors: available_colors });*/
    } else if (type === "file") {
      console.log(target.files[0]);
      this.setState({
        product_img: target.files[0],
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
    // const value = target.type === "checkbox" ? target.checked : target.value;
  }

  // Submit
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);

    const formData = new FormData();

    formData.append("product_img", this.state.product_img);
    formData.append("product_name", this.state.product_name);
    formData.append("product_type", this.state.product_type);
    formData.append("has_discount", this.state.has_discount);
    formData.append("available_colors", this.state.available_colors);
    formData.append("description", this.state.description);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    this.props.updateProduct(this.props.match.params.id,formData,config);
    this.props.history.push("/index");
  };

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Edit Product</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Product Image: </label>
            <input
              type="file"
              name="product_img"
              className="form-control"
              onChange={this.handleInputChange}
            />
            {this.state.product_img_path && (
              <img
                style={{ height: "50px", marginTop: "10px" }}
                src={`${IMG_URL_PATH}${this.state.product_img_path}`}
                className="img-fluid"
                alt="demo"
              />
            )}
          </div>
          <div className="form-group">
            <label>Product Name: </label>
            <input
              type="text"
              name="product_name"
              className="form-control"
              value={this.state.product_name}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Product Type: </label>
            <select
              className="form-control"
              name="product_type"
              value={this.state.product_type}
              onChange={this.handleInputChange}
            >
              <option value="">Type</option>
              <option value="beauty">Beauty</option>
              <option value="electronic">Electronic</option>
              <option value="grocery">Grocery</option>
            </select>
          </div>
          <div className="form-group">
            <label>Has Discount: </label>
            <div>
              <input
                type="radio"
                name="has_discount"
                value="yes"
                checked={this.state.has_discount === "yes"}
                onChange={this.handleInputChange}
              />{" "}
              Yes &nbsp;
              <input
                type="radio"
                name="has_discount"
                value="no"
                checked={this.state.has_discount === "no"}
                onChange={this.handleInputChange}
              />{" "}
              No
            </div>
          </div>

          <div className="form-group">
            <label>Available Colors: </label>
            <div>
              <input
                type="checkbox"
                value="red"
                checked={this.state.available_colors.includes("red")}
                onChange={this.handleInputChange}
              />{" "}
              Red &nbsp;
              <input
                type="checkbox"
                value="blue"
                checked={this.state.available_colors.includes("blue")}
                onChange={this.handleInputChange}
              />{" "}
              Blue &nbsp;
              <input
                type="checkbox"
                value="white"
                checked={this.state.available_colors.includes("white")}
                onChange={this.handleInputChange}
              />{" "}
              White
            </div>
          </div>

          <div className="form-group">
            <label>Description: </label>
            <div>
              <textarea
                className="form-control"
                name="description"
                value={this.state.description}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Update" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ product: state.product.product });

export default connect(mapStateToProps, { getProduct,updateProduct })(Edit);
