import React from "react";

const Header = ({page, setPage}) => {
	return <header className={"flex center header store1"}>
		<button onClick={() => setPage("today")} className={page === "today" ? "active" : ""}>
			Pedidos
		</button>
		<button onClick={() => setPage("stock")} className={page === "stock" ? "active" : ""}>
			Estoque
		</button>
		<button onClick={() => setPage("user")} className={page === "user" ? "active" : ""}>
			Usuários
		</button>
	</header>
}

export default Header;
