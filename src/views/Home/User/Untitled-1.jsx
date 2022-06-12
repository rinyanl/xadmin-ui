
<Box sx={{
    overflowX: 'auto',
}}>
    {orderList.length <= 0 ?
        <Box sx={{ textAlign: 'center' }}>
            <Divider sx={{ borderColor: React.$theme.background[200], mb: 0.5, }} />
            <Box sx={{ mt: 3 }}>
                暂无数据
            </Box>
        </Box>


        :
        <Table sx={{
            // overflowX: 'scroll',
            '.MuiTableCell-root': {
                borderColor: React.$theme.background[200],
            },
        }}
        >
            <TableHead >
                <TableRow >
                    <TableCell sx={{ minWidth: 120 }}>订单号</TableCell>
                    <TableCell sx={{ minWidth: 100 }}>购买时长</TableCell>
                    <TableCell sx={{ minWidth: 100 }}>套餐类型</TableCell>
                    <TableCell sx={{ minWidth: 100 }}>支付方式</TableCell>
                    <TableCell sx={{ minWidth: { xs: 160 } }}>创建时间</TableCell>
                    <TableCell align='right' sx={{ minWidth: { xs: 300 } }}>状态</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    (orderList.length > 0 ?
                        orderList.slice(page * 10, (page * 10) + 10)
                        : orderList
                    ).map((m, i) => {
                        return (
                            <TableRow hover key={m.Id}>
                                <TableCell >{m.Id}</TableCell>
                                <TableCell >{m.CardTime}</TableCell>
                                <TableCell >{m.OrderType}</TableCell>
                                <TableCell >{m.PayType}</TableCell>
                                <TableCell >{m.CreateTime}</TableCell>
                                <TableCell align='right' sx={{ display: 'flex', alignItems: 'center' }}>


                                    {m.OrderStatus === 0 ?
                                        <CountDown
                                            EndTime={m.EndTime}
                                            getOrderList={getOrderList}
                                            Id={m.Id}
                                            OrderType={m.OrderType}
                                            CardTime={m.CardTime}
                                            OrderNum={m.OrderNum}
                                            Discount={m.Discount}
                                            Payment={m.Payment}
                                            goPay={goPay}
                                            sx={{ mr: 2 }}
                                        />
                                        :
                                        <Button
                                            variant=''
                                            disabled
                                        >
                                            {filterStatu(m.OrderStatus)}
                                        </Button>
                                    }
                                </TableCell>
                            </TableRow>
                        )
                    })

                }


            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[10]}
                        colSpan={10}
                        count={orderList.length}
                        rowsPerPage={10}
                        page={page}
                        onPageChange={pageChange}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    }

</Box>