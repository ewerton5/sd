import { useState } from "react";
import "./App.css";

function App() {
  const [A, setA] = useState("");
  const [B, setB] = useState("");

  const toBin = (value, bits) => {
    const bin = value.toString(2);
    if (bin.length >= bits) {
      return bin.slice(bin.length - bits, bin.length);
    } else {
      return Array(bits - bin.length + 1).join("0") + bin;
    }
  };

  const toDec = (value) => parseInt(value, 2);

  const isPair = (value) =>
    (value.split("1").length - 1) % 2 === 0 ? "1" : "0";

  return (
    <div className="App">
      <header>
        <h1>Sistemas digitais 2020.1 - EL2 é a melhor turma</h1>
      </header>
      Va:
      <input
        type="text"
        value={A}
        onChange={(e) => {
          const { data, inputType } = e.nativeEvent;
          if (inputType === "deleteContentBackward") {
            setA(A.slice(0, A.length - 1));
          }
          if (data === "0" || data === "1") {
            setA(A + data);
          }
        }}
      />
      Vb:
      <input
        type="text"
        value={B}
        onChange={(e) => {
          const { data, inputType } = e.nativeEvent;
          if (inputType === "deleteContentBackward") {
            setB(B.slice(0, B.length - 1));
          }
          if (data === "0" || data === "1") {
            setB(B + data);
          }
        }}
      />
      <table>
        <tr>
          <th></th>
          <th>RESULTADO</th>
          <th>C/B</th>
          <th>OV</th>
          <th>SINAL</th>
          <th>PAR</th>
          <th>ZERO</th>
        </tr>
        <tr>
          <td>Va + Vb</td>
          <td>{toBin(toDec(A) + toDec(B), A.length)}</td>
          <td>{toDec(A) + toDec(B) >= Math.pow(2, A.length) ? "1" : "0"}</td>
          <td>N/A</td>
          <td>{toBin(toDec(A) + toDec(B), A.length)[0]}</td>
          <td>{isPair(toBin(toDec(A) + toDec(B), A.length))}</td>
          <td>{toDec(A) + toDec(B) === 0 ? "1" : "0"}</td>
        </tr>
        <tr>
          <td>Va - Vb</td>
          <td>{toBin(toDec(A) - toDec(B), A.length)}</td>
          <td>{toDec(A) - toDec(B) >= Math.pow(2, A.length) ? "1" : "0"}</td>
          <td>N/A</td>
          <td>{toBin(toDec(A) - toDec(B), A.length)[0]}</td>
          <td>{isPair(toBin(toDec(A) - toDec(B), A.length))}</td>
          <td>{toDec(A) - toDec(B) === 0 ? "1" : "0"}</td>
        </tr>
        <tr>
          <td>Va x Vb (com sinal)</td>
          <td>
            {toBin(
              Math.pow(2, A.length + B.length) -
                (Math.pow(2, A.length) - toDec(A)) * toDec(B),
              A.length + B.length
            )}
          </td>
          <td></td>
          <td></td>
          <td>
            {
              toBin(
                Math.pow(2, A.length + B.length) -
                  (Math.pow(2, A.length) - toDec(A)) * toDec(B),
                A.length + B.length
              )[0]
            }
          </td>
          <td>
            {isPair(
              toBin(
                Math.pow(2, A.length + B.length) -
                  (Math.pow(2, A.length) - toDec(A)) * toDec(B),
                A.length + B.length
              )
            )}
          </td>
          <td>
            {Math.pow(2, A.length + B.length) -
              (Math.pow(2, A.length) - toDec(A)) * toDec(B) ===
            0
              ? "1"
              : "0"}
          </td>
        </tr>
        <tr>
          <td>Va x Vb (sem sinal)</td>
          <td>{toBin(toDec(A) * toDec(B), A.length + B.length)}</td>
          <td></td>
          <td></td>
          <td>{toBin(toDec(A) * toDec(B), A.length + B.length)[0]}</td>
          <td>{isPair(toBin(toDec(A) * toDec(B), A.length + B.length))}</td>
          <td>{toDec(A) * toDec(B) === 0 ? "1" : "0"}</td>
        </tr>
        <tr>
          <td>Va / Vb (com sinal)</td>
          <td>
            {toBin(
              Math.pow(2, A.length) -
                ((Math.pow(2, A.length) - toDec(A)) % toDec(B)),
              A.length
            )}
            |
            {toBin(
              Math.pow(2, A.length) -
                Math.trunc((Math.pow(2, A.length) - toDec(A)) / toDec(B)),
              A.length
            )}
          </td>
          <td></td>
          <td></td>
          <td>
            {
              toBin(
                Math.pow(2, A.length) -
                  Math.trunc((Math.pow(2, A.length) - toDec(A)) / toDec(B)),
                A.length,
                A.length
              )[0]
            }
          </td>
          <td>
            {isPair(
              toBin(
                Math.pow(2, A.length) -
                  Math.trunc((Math.pow(2, A.length) - toDec(A)) / toDec(B)),
                A.length,
                A.length
              )
            )}
          </td>
          <td>
            {
              (Math.pow(2, A.length) -
                Math.trunc((Math.pow(2, A.length) - toDec(A)) / toDec(B)),
              A.length === 0 ? "1" : "0")
            }
          </td>
        </tr>
        <tr>
          <td>Va / Vb (sem sinal)</td>
          <td>
            {toBin(toDec(A) % toDec(B), A.length)}|
            {toBin(Math.trunc(toDec(A) / toDec(B)), A.length)}
          </td>
          <td></td>
          <td></td>
          <td>{toBin(Math.trunc(toDec(A) / toDec(B)), A.length)[0]}</td>
          <td>{isPair(toBin(Math.trunc(toDec(A) / toDec(B)), A.length))}</td>
          <td>{Math.trunc(toDec(A) / toDec(B)) === 0 ? "1" : "0"}</td>
        </tr>
        <tr>
          <td>Va AND Vb</td>
          <td>{toBin(toDec(A) & toDec(B), A.length)}</td>
          <td></td>
          <td></td>
          <td>{toBin(toDec(A) & toDec(B), A.length)[0]}</td>
          <td>{isPair(toBin(toDec(A) & toDec(B), A.length))}</td>
          <td>{(toDec(A) & toDec(B)) === 0 ? "1" : "0"}</td>
        </tr>
        <tr>
          <td>Va OR Vb</td>
          <td>{toBin(toDec(A) | toDec(B), A.length)}</td>
          <td></td>
          <td></td>
          <td>{toBin(toDec(A) | toDec(B), A.length)[0]}</td>
          <td>{isPair(toBin(toDec(A) | toDec(B), A.length))}</td>
          <td>{(toDec(A) | toDec(B)) === 0 ? "1" : "0"}</td>
        </tr>
        <tr>
          <td>Va XOR Vb</td>
          <td>{toBin(toDec(A) ^ toDec(B), A.length)}</td>
          <td></td>
          <td></td>
          <td>{toBin(toDec(A) ^ toDec(B), A.length)[0]}</td>
          <td>{isPair(toBin(toDec(A) ^ toDec(B), A.length))}</td>
          <td>{(toDec(A) ^ toDec(B)) === 0 ? "1" : "0"}</td>
        </tr>
      </table>
    </div>
  );
}

export default App;
