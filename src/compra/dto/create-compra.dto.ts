export class CreateCompraDto {
    fornecedorId: number
    funcionarioId: number
    items: {
        produtoId: number
        quantidade: number
        preco_unitario: number
    }[]
}
