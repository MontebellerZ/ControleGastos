import "./CmpTabela.css";

function CmpTabela(props) {
	let cabeca = props.cabeca;
	let corpo = props.corpo;

	return (
		<table>
			<thead>
				<tr>
					{cabeca.map((titulo, index) => (
						<th key={index}>{titulo}</th>
					))}
				</tr>
			</thead>
            
			<tbody>
				{corpo.map((linha, index) => (
					<tr key={index}>
						{linha.map((dado, index) => (
							<td key={index}>{dado}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default CmpTabela;
