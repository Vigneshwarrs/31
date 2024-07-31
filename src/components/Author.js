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

const authors = [
  {
      name: "Harper Lee",
      dob: "1926-04-28",
      bio: "Harper Lee was an American author best known for her Pulitzer Prize-winning novel 'To Kill a Mockingbird' (1960), which addresses themes of racial injustice and moral growth in the American South."
  },
  {
      name: "George Orwell",
      dob: "1903-06-25",
      bio: "George Orwell was an English novelist, essayist, and critic, famous for his works 'Animal Farm' (1945) and '1984' (1949), which critique totalitarianism and explore themes of surveillance and social injustice."
  },
  {
      name: "Jane Austen",
      dob: "1775-12-16",
      bio: "Jane Austen was an English novelist known for her six major novels including 'Pride and Prejudice' (1813) and 'Sense and Sensibility' (1811), which explore themes of social class, marriage, and morality."
  },
  {
      name: "F. Scott Fitzgerald",
      dob: "1896-09-24",
      bio: "F. Scott Fitzgerald was an American novelist celebrated for his portrayal of the Jazz Age in works like 'The Great Gatsby' (1925), which examines themes of wealth, class, and the American Dream."
  },
  {
      name: "J.K. Rowling",
      dob: "1965-07-31",
      bio: "J.K. Rowling is a British author best known for the 'Harry Potter' series, which has achieved global success and acclaim for its imaginative storytelling and complex characters."
  },
  {
      name: "Gabriel García Márquez",
      dob: "1927-03-06",
      bio: "Gabriel García Márquez was a Colombian novelist and Nobel Prize winner, renowned for his works 'One Hundred Years of Solitude' (1967) and 'Love in the Time of Cholera' (1985), key examples of magical realism."
  },
  {
      name: "Toni Morrison",
      dob: "1931-02-18",
      bio: "Toni Morrison was an American novelist and Nobel laureate, known for her powerful narratives on African American experiences, including 'Beloved' (1987) and 'Song of Solomon' (1977)."
  },
  {
      name: "Mark Twain",
      dob: "1835-11-30",
      bio: "Mark Twain, born Samuel Clemens, was an American writer and humorist famous for his novels 'The Adventures of Tom Sawyer' (1876) and 'Adventures of Huckleberry Finn' (1884), which offer critical perspectives on society and human nature."
  },
  {
      name: "Leo Tolstoy",
      dob: "1828-09-09",
      bio: "Leo Tolstoy was a Russian novelist known for his epic novels 'War and Peace' (1869) and 'Anna Karenina' (1877), which delve into themes of history, morality, and the human condition."
  },
  {
      name: "J.D. Salinger",
      dob: "1919-01-01",
      bio: "J.D. Salinger was an American writer best known for his novel 'The Catcher in the Rye' (1951), which explores teenage angst and alienation through the character Holden Caulfield."
  },
  {
      name: "Stephen King",
      dob: "1947-09-21",
      bio: "Stephen King is an American author renowned for his extensive body of work in the horror genre, including bestsellers like 'Carrie' (1974) and 'The Shining' (1977), which have had a significant impact on modern horror literature."
  }
];


function Author() {
    const [authorList, setAuthorList] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentAuthorIndex, setCurrentAuthorIndex] = useState(null);
    useEffect(()=>setAuthorList(authors),[]);

    const handleOpen = (index) => {
        if (index !== undefined) {
            setEditMode(true);
            setCurrentAuthorIndex(index);
            const author = authorList[index];
            authorForm.setValues({
                name: author.name,
                dob: author.dob,
                bio: author.bio,
            });
        } else {
            setEditMode(false);
            authorForm.resetForm();
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setCurrentAuthorIndex(null);
        authorForm.resetForm();
    };

    const bookValidation = yup.object({
        name: yup.string()
            .min(2, 'Title Should be above 5 Characters')
            .max(40, 'Title Should be with 40 Characters')
            .matches(/^[A-z ]+$/, 'Name does not match the requirement!')
            .required("Please Enter Author Name"),
        dob: yup.string()
            .matches(/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, "Date of Birth does not match the requirement!")
            .required("Please Enter DOB"),
        bio: yup.string()
            .min(40, 'Name Should be above 40 Characters')
            .max(250, 'Name Should be with 40 Characters')
            .matches(/^[A-z ]+$/, 'Bio does not match the requirement!')
            .required("Please Enter Biography"),
    });

    const authorForm = useFormik({
        initialValues: { name: "", dob: "12/12/2000", bio: ""},
        validationSchema: bookValidation,
        onSubmit: (values) => {
            if (editMode) {
                setAuthorList(authorList.map((book, index) =>
                    index === currentAuthorIndex
                        ? { ...values }
                        : book
                ));
            } else {
                setAuthorList([...authorList, values]);
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
            <Button color="inherit" startIcon={<AddIcon />} variant='contained' onClick={() => handleOpen()}>Add Author</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <form onSubmit={authorForm.handleSubmit}>
                        <TextField style={{ width: '350px', margin: "5px" }} label="Name" value={authorForm.values.name} variant="outlined" name='name' onChange={authorForm.handleChange} onBlur={authorForm.handleBlur} required/>
                        <Typography color="error">{authorForm.touched.name && authorForm.errors.name?authorForm.errors.name:""}</Typography>
                        <TextField style={{ width: '350px', margin: "5px" }} label="Date Of Birth" value={authorForm.values.dob} variant="outlined" name='dob' onChange={authorForm.handleChange} onBlur={authorForm.handleBlur} required/>
                        <Typography color="error">{authorForm.touched.dob && authorForm.errors.dob?authorForm.errors.dob:""}</Typography>
                        <TextField style={{ width: '350px', margin: "5px" }} label="Biography" value={authorForm.values.bio} variant="outlined" name='bio' onChange={authorForm.handleChange} onBlur={authorForm.handleBlur} required/>
                        <Typography color="error">{authorForm.touched.bio && authorForm.errors.bio?authorForm.errors.bio:""}</Typography>
                        <Button variant='contained' type='submit' style={{ width: "350px", margin: "5px" }} color="success">
                            {editMode ? 'Update' : 'Submit'}
                        </Button>
                    </form>
                </Box>
            </Modal>

            <h1>Book List</h1>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {authorList.map((atr, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <Card sx={{ maxWidth: 390 }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">{atr.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">{atr.dob}</Typography>
                                    <Typography variant="body2" color="text.secondary">{atr.bio}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="medium" color='secondary' variant='contained' startIcon={<EditIcon />} onClick={() => handleOpen(index)}>Edit</Button>
                                    <Button size="medium" color='error' variant='contained' startIcon={<DeleteIcon />} onClick={() => setAuthorList(authorList.filter((_, i) => i !== index))}>Delete</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}

export default Author;
