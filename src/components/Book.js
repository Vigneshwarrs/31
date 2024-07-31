import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Modal, Box, TextField, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';

const books = [
  {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      iSBN: "978-0061120084",
      publishDate: "11/07/1960"
  },
  {
      title: "1984",
      author: "George Orwell",
      iSBN: "978-0451524935",
      publishDate: "08/06/1949"
  },
  {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      iSBN: "978-1503290563",
      publishDate: "28/01/1813"
  },
  {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      iSBN: "978-0743273565",
      publishDate: "10/04/1925"
  },
  {
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      iSBN: "978-0590353427",
      publishDate: "01/09/1997"
  },
  {
      title: "One Hundred Years of Solitude",
      author: "Gabriel García Márquez",
      iSBN: "978-0060883287",
      publishDate: "05/06/1967"
  },
  {
      title: "Beloved",
      author: "Toni Morrison",
      iSBN: "978-0452286005",
      publishDate: "1987-09-16"
  },
  {
      title: "The Adventures of Tom Sawyer",
      author: "Mark Twain",
      iSBN: "978-0486282514",
      publishDate: "1876-04- 01/04/1876"
  },
  {
      title: "War and Peace",
      author: "Leo Tolstoy",
      iSBN: "978-1400079988",
      publishDate: "01/03/1869"
  },
  {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      iSBN: "978-0316769488",
      publishDate: "16/07/1951"
  }
];


function Book() {
    const [bookList, setBookList] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentBookIndex, setCurrentBookIndex] = useState(null);
    useEffect(()=>setBookList(books),[]);

    const handleOpen = (index) => {
        if (index !== undefined) {
            setEditMode(true);
            setCurrentBookIndex(index);
            const book = bookList[index];
            bookForm.setValues({
                title: book.title,
                author: book.author,
                iSBN: book.iSBN,
                publishDate: book.publishDate,
            });
        } else {
            setEditMode(false);
            bookForm.resetForm();
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setCurrentBookIndex(null);
        bookForm.resetForm();
    };

    const bookValidation = yup.object({
        title: yup.string()
            .min(5, 'Title Should be above 5 Characters')
            .max(40, 'Title Should be with 40 Characters')
            .matches(/^(?=.*?[A-z]).+$/, 'Title does not match the requirement!')
            .required("Please Enter Book Title"),
        author: yup.string()
            .min(2, 'Name Should be above 2 Characters')
            .max(40, 'Name Should be with 40 Characters')
            .matches(/^[A-z. ]+$/, 'Author Name does not match the requirement!')
            .required("Please Enter Author Name"),
        iSBN: yup.string()
            .min(5, 'iSBN number should be above 5 digits')
            .max(40, 'iSBN number should be with 40 digits')
            .matches(/^[0-9-]+$/, 'iSBN Number does not match the requirement!')
            .required("Please Enter ISBN number"),
        publishDate: yup.string()
            .matches(/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, "Publish Date does not match the requirement!")
            .required("Please Enter Publish date"),
    });

    const bookForm = useFormik({
        initialValues: { title: "", author: "", iSBN: "", publishDate: "12/12/2000" },
        validationSchema: bookValidation,
        onSubmit: (values) => {
            if (editMode) {
                setBookList(bookList.map((book, index) =>
                    index === currentBookIndex
                        ? { ...values }
                        : book
                ));
            } else {
                setBookList([...bookList, values]);
            }
            handleClose();
        }
    });

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        textAlign: 'center'
    };

    return (
        <div className='home'>
            <Button color="inherit" startIcon={<AddIcon />} variant='contained' onClick={() => handleOpen()}>Add Book</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <form onSubmit={bookForm.handleSubmit}>
                        <TextField style={{ width: '350px', margin: "5px" }} label="Title" value={bookForm.values.title} variant="outlined" name='title' onChange={bookForm.handleChange} onBlur={bookForm.handleBlur} required/>
                        <Typography color="error">{bookForm.touched.title && bookForm.errors.title?bookForm.errors.title:""}</Typography>
                        <TextField style={{ width: '350px', margin: "5px" }} label="Author" value={bookForm.values.author} variant="outlined" name='author' onChange={bookForm.handleChange} onBlur={bookForm.handleBlur} required/>
                        <Typography color="error">{bookForm.touched.author && bookForm.errors.author?bookForm.errors.author:""}</Typography>
                        <TextField style={{ width: '350px', margin: "5px" }} label="iSBN" value={bookForm.values.iSBN} variant="outlined" name='iSBN' onChange={bookForm.handleChange} onBlur={bookForm.handleBlur} required/>
                        <Typography color="error">{bookForm.touched.iSBN && bookForm.errors.iSBN?bookForm.errors.iSBN:""}</Typography>
                        <TextField style={{ width: '350px', margin: "5px" }} label="Publish Date" value={bookForm.values.publishDate} variant="outlined" name='publishDate' onChange={bookForm.handleChange} onBlur={bookForm.handleBlur} required/>
                        <Typography color="error">{bookForm.touched.publishDate && bookForm.errors.publishDate? bookForm.errors.publishDate : ""}</Typography>
                        <Button variant='contained' color="success" type='submit' style={{ width: "350px", margin: "5px" }}>
                            {editMode ? 'Update' : 'Submit'}
                        </Button>
                    </form>
                </Box>
            </Modal>

            <h1>Book List</h1>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {bookList.map((bk, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <Card sx={{ maxWidth: 390 }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">{bk.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">Author: {bk.author}</Typography>
                                    <Typography variant="body2" color="text.secondary">ISBN: {bk.iSBN}</Typography>
                                    <Typography variant="body2" color="text.secondary">Publish Date: {bk.publishDate}</Typography>
                                </CardContent>
                                <CardActions className='btn'>
                                    <Button size="medium" color='secondary' variant='contained' startIcon={<EditIcon />} onClick={() => handleOpen(index)}>Edit</Button>
                                    <Button size="medium" color='error' variant='contained' startIcon={<DeleteIcon />} onClick={() => setBookList(bookList.filter((_,i) => i !== index))}>Delete</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}

export default Book;
