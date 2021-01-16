import React, { Component } from "react";
import axios from "axios";

import { connect } from "react-redux";
import TableRow from "./TableRow";

import { getProducts, deleteProduct } from '../actions/product';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
    this.deleteData = this.deleteData.bind(this);
  }

  componentDidMount = async () =>{
    this.props.getProducts();
  }

  deleteData(product_id) {
    this.props.deleteProduct(product_id);
  }

  tabRow(deleteData) {
    if (this.props.products.length > 0)
      return this.props.products.map(function (product, i) {
        return <TableRow item={product} key={product._id} func={deleteData} />;
      });
    else
      return (
        <tr>
          <td colSpan="7">
            <h4 className="text-center">No data</h4>
          </td>
        </tr>
      );
  }

  render() {
    return (
      <div>
        <h3 align="center">Product List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Type</th>
              <th>Has Discount</th>
              <th>Available Colors</th>
              <th>Description</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>{this.tabRow(this.deleteData)}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ products: state.product.products });

export default connect(mapStateToProps,{getProducts,deleteProduct})(Index);