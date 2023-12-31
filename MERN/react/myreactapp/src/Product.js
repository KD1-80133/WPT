import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Product() {
    const url = "http://127.0.0.1:5000/product";
    const [products, setProducts] = useState([]);
    const [AddRecords, setAddRecords] = useState(false);
    const [product ,setProduct]=useState({producttitle:"",price:"",stock:""});
    const [isEditMode, setIsEditMode] = useState(false);

    const EditRecord = (productId) => {
        const selectedProduct = products.find(product => product.productid === productId);
        if (selectedProduct) {
            setProduct(selectedProduct);
            setAddRecords(true);
            setIsEditMode(true); 
        }
    };

    const UpdateRecord = () => {
        const updateurl = url + "/" + product.productid;

        axios.put(updateurl, product).then((result) => {
            if (result.data.affectedRows !== undefined && result.data.affectedRows > 0) {
                // ShowMessage("Record updated successfully!!");
                FetchRecord();
                setProduct({ producttitle: "", price: "", stock: "" });
                setAddRecords(false);
                setIsEditMode(false); 
            }
        });
    };
    const AddProduct = () => {
        setAddRecords(!AddRecords);
    };

    const RemovedRecord = (productid) => {
        const confirmation = window.confirm("Are you sure you want to delete this product?");
        if (confirmation) {
            axios.delete(url + "/" + productid).then((result) => {
                if (result.data.affectedRows !== undefined && result.data.affectedRows > 0) {
                    FetchRecord();
                }
            });
        }
    };

    const FetchRecord = () => {
        axios.get(url).then((result) => {
            setProducts(result.data);
        });
    };

    const OnTextChange = (args) => {
        var product1 = { ...product };
        product1[args.target.name] = args.target.value;
        setProduct(product1);
    };

    const AddRecord = () => {
        // const isAnyFieldNotEmpty = Object.values(product).some(value => value.trim() !== '');
    
        // if (isAnyFieldNotEmpty) {
        //     alert('Please make sure all fields are blank before adding a new record.');
        //     return;
        // }
    
        axios.post(url, product).then((result) => {
            if (result.data.affectedRows !== undefined && result.data.affectedRows > 0) {
                setProduct({ producttitle: "", price: "", stock: "" }); 
                FetchRecord();
                setAddRecords(false);
            }
        });
    };
    
    

    useEffect(() => {
        FetchRecord();
    }, []);

    return (
        <div className='container'>
            {!AddRecords ? (
                <div className='table-responsive'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>ProductID</th>
                                <th>ProductTitle</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr
                                    key={product.productid}
                                    className={product.stock === 0 ? 'table-danger' : 'table-info'}
                                >
                                    <td>{product.productid}</td>
                                    <td>{product.producttitle}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock === 0 ? 'Not Available' : product.stock}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => RemovedRecord(product.productid)}>Delete</button>
                                    </td>
                                    <td><button classname="btn btn-warning" onClick={()=>EditRecord(product.productid)}>Edit</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-primary" onClick={AddProduct}>
                        Add Product
                    </button>
                </div>
            ) : (
                <div>
                    <h2>Add Product</h2>
                    <table className='table table-bordered'>
                        <tbody>
                            <tr>
                                <td>Product Title:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="producttitle"
                                        value={product.producttitle}
                                        onChange={OnTextChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Price:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="price"
                                        value={product.price}
                                        onChange={OnTextChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Stock:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="stock"
                                        value={product.stock}
                                        onChange={OnTextChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button className="btn btn-primary" onClick={AddRecord}>
                                        Add Record
                                    </button>{"  "}
                                    <button className="btn btn-secondary" onClick={AddProduct}>
                                        Cancel
                                    </button>{"  "}
                                    <button className="btn btn-success" onClick={isEditMode ? UpdateRecord : AddRecord}>update
            </button>                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Product;
