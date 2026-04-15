export class CreatePedidoDto {
    clienteId: number
    funcionarioId: number
    items: {
        produtoId: number
        quantidade: number
        preco_unitario: number
    }[]
}