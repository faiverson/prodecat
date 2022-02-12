const WrapperLoading = ({wrap, children}) => {
  return wrap ? <div className="wrapper-loader">{children}</div> : {children}
}

const Loading = ({fullPage}) => {
  return (
    <WrapperLoading wrap={fullPage}>
      <div className="loader">
        <div className="loader_ball"></div>
        <div className="loader_ball"></div>
        <div className="loader_ball"></div>
      </div>
    </WrapperLoading>
  )
}

export { Loading }
