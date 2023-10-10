CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha VARCHAR(150) NOT NULL
);

CREATE TABLE categorias (
  id SERIAL PRIMARY KEY, 
  descricao VARCHAR(150) NOT NULL UNIQUE
);

INSERT INTO 
  categorias (descricao)
VALUES
  ('Informática'),
  ('Celulares'),
  ('Beleza e Perfumaria'),
  ('Mercado'),
  ('Livros e Papelaria'),
  ('Brinquedos'),
  ('Moda'),
  ('Bebê'),
  ('Games'); 

CREATE TABLE produtos (
  id SERIAL PRIMARY KEY,
  descricao VARCHAR(150) NOT NULL,
  quantidade_estoque SMALLINT NOT NULL,
  valor INTEGER NOT NULL,
  categoria_id SMALLINT NOT NULL REFERENCES categorias(id) 
);

CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  cep VARCHAR(8) DEFAULT NULL,
  rua VARCHAR(250) DEFAULT NULL,
  numero VARCHAR(10) DEFAULT NULL,
  bairro VARCHAR(150) DEFAULT NULL,
  cidade VARCHAR(150) DEFAULT NULL,
  estado VARCHAR(2) DEFAULT NULL
);

CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  cliente_id SMALLINT NOT NULL REFERENCES clientes(id),
  observacao VARCHAR(150),
  valor_total INTEGER NOT NULL
);

CREATE TABLE pedido_produtos (
  id SERIAL PRIMARY KEY,
  pedido_id SMALLINT NOT NULL REFERENCES pedidos(id),
  produto_id SMALLINT NOT NULL REFERENCES produtos(id),
  quantidade_produto SMALLINT NOT NULL,
  valor_produto INTEGER NOT NULL,
);

ALTER TABLE produtos 
ADD produto_imagem VARCHAR(255);