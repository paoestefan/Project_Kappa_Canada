from flask import Flask, render_template
import pandas as pd
from sqlalchemy import create_engine

app = Flask(__name__, template_folder='.')


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/Canada_data")
def Canada_data():
    Canada_data = pd.read_json('canada.geojson')

    return (
        Canada_data
        .to_json(orient="records")
    )

@app.route("/api_data")
def api_data():
    connection_string = "postgres:titota@localhost:5432/Canada_VSales"
    con = create_engine(f'postgresql://{connection_string}')
    data=pd.read_sql('select * from "Canada_Vsales_Bunits"',con)

    Canada_VSales=data

    return (
        Canada_VSales
        .to_json(orient="records")
        )

if __name__=="__main__":
    app.run(debug=True)