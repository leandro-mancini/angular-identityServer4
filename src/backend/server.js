module.exports = () => {
  const data = {
    usuarios: []
  }

  // Generate Funcionarios
  for (let i = 1; i < 2; i++) {
    const item = {
      id: i,
      username: 'usuario' + i,
      senha: '123',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c3VhcmlvMSIsInNlbmhhIjoiMTIzIn0.Pu_q8I5wAFYKMoRHx89SALV2zRE9YvfmF6WYthpDLbU'
    };

    data.usuarios.push(item);
  }

  return data;
}
