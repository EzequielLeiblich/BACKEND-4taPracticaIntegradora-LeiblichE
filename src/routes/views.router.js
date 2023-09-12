import { Router } from 'express';
const viewsRouter = Router();

viewsRouter.get('/', (req, res) => {
  res.render('products', {
    title: 'Productos'
  })
});

viewsRouter.get('/products', (req, res) => {
  res.render('products', {
    title: 'Productos'
  })
});

viewsRouter.get('/cart', (req, res) => {
  res.render('cart', {
    title: 'Carrito'
  });
});

viewsRouter.get('/chat', (req, res) => {
  res.render('chat', {
    title: 'Chat'
  })
});

viewsRouter.get('/register', (req, res) => {
  res.render('register', {
    title: 'Registro'
  });
});

viewsRouter.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login'
  });
});

viewsRouter.get('/completeProfile', (req, res) => {
  res.render('extraForm', {
    title: 'Formulario'
  })
});

export default viewsRouter;