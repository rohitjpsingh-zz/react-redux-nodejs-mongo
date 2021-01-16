import React, { Component } from "react";

import './Create.css';

import { addProduct } from '../actions/product';
import { connect } from "react-redux";



class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product_img: null,
      product_name: "",
      product_type: "",
      has_discount: "",
      available_colors: [],
      description: "",
      errors: {}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;

    const type = target.type;
    const name = target.name;
    const value = target.value;
    // console.log(`target type : ${type} | target name : ${name} | target value : ${value} | target.checked : ${target.checked}`);

    if (type === "checkbox") {
      if (target.checked) {
        this.setState(
          {
            available_colors: [...this.state.available_colors, target.value],
          },
          () => {
            // console.log("available_colorsss", this.state.available_colors);
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
            // console.log("available_colorsss", this.state.available_colors);
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

    }
    else if(type === "file"){
        // console.log(target.files[0]);
        this.setState({
            product_img: target.files[0],
        })
    }    
    else {
      this.setState({
        [name]: value,
      });
    }
    // const value = target.type === "checkbox" ? target.checked : target.value;
  }

  // Submit
  onSubmit = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      const formData = new FormData();

      formData.append('product_img',this.state.product_img);
      formData.append('product_name',this.state.product_name);
      formData.append('product_type',this.state.product_type);
      formData.append('has_discount',this.state.has_discount);
      formData.append('available_colors',this.state.available_colors);
      formData.append('description',this.state.description);

      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      }

      this.props.addProduct(formData,config);
      this.props.history.push("/index");
    }
  };

  validateForm() {

    const {product_img,product_name,product_type,available_colors,description} = this.state;

    let errors = {};
    let formIsValid = true;

    if (!product_img) {
      formIsValid = false;
      errors["product_img"] = "*Please select image.";
    }

    if (!product_name) {
      formIsValid = false;
      errors["product_name"] = "*Please enter product name.";
    }

    if (!product_type) {
      formIsValid = false;
      errors["product_type"] = "*Please select product type.";
    }

    if (available_colors.length == 0) {
      formIsValid = false;
      errors["available_colors"] = "*Please check any product colors.";
    }

    if (!description) {
      formIsValid = false;
      errors["description"] = "*Please enter product description.";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Add New Product</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Product Image: </label>
            <input
              type="file"
              name="product_img"
              className="form-control"
              onChange={this.handleInputChange}
            />
            <div className="errorMsg">{this.state.errors.product_img}</div>
          </div>
          <div className="form-group">
            <label>Product Name: </label>
            <input
              type="text"
              name="product_name"
              className="form-control"
              onChange={this.handleInputChange}
            />
            <div className="errorMsg">{this.state.errors.product_name}</div>
          </div>
          <div className="form-group">
            <label>Product Type: </label>
            <select
              className="form-control"
              name="product_type"
              onChange={this.handleInputChange}
            >
              <option value="">Type</option>
              <option value="beauty">Beauty</option>
              <option value="electronic">Electronic</option>
              <option value="grocery">Grocery</option>
            </select>
            <div className="errorMsg">{this.state.errors.product_type}</div>
          </div>
          <div className="form-group">
            <label>Has Discount: </label>
            <div>
              <input
                type="radio"
                name="has_discount"
                value="yes"
                onChange={this.handleInputChange}
              />{" "}
              Yes &nbsp;
              <input
                type="radio"
                name="has_discount"
                value="no"
                onChange={this.handleInputChange}
              />{" "}
              No
            </div>
            <div className="errorMsg">{this.state.errors.product_type}</div>
          </div>

          <div className="form-group">
            <label>Available Colors: </label>
            <div>
              <input
                type="checkbox"
                value="red"
                onChange={this.handleInputChange}
              />{" "}
              Red &nbsp;
              <input
                type="checkbox"
                value="blue"
                onChange={this.handleInputChange}
              />{" "}
              Blue &nbsp;
              <input
                type="checkbox"
                value="white"
                onChange={this.handleInputChange}
              />{" "}
              White
            </div>
            <div className="errorMsg">{this.state.errors.available_colors}</div>
          </div>

          <div className="form-group">
            <label>Description: </label>
            <div>
              <textarea
                className="form-control"
                name="description"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="errorMsg">{this.state.errors.description}</div>
          </div>
          <div className="form-group">
            <input type="submit" value="Save" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null,{addProduct})(Create) ;