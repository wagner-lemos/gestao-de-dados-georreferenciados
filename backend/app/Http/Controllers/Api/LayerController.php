<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Layer;

class LayerController extends Controller
{
    public function index()
    {
        $layers = Layer::orderBy('id', 'desc')->paginate(10);

        $formattedData = $layers->map(function ($layer) {
            return [
                'id' => $layer->id,
                'name' => $layer->name,
            ];
        });

        return response()->json([
            'data' => $formattedData, //$dicom->items(),
            'links' => [
                'first' => $layers->url(1),
                'last' => $layers->url($layers->lastPage()),
                'prev' => $layers->previousPageUrl(),
                'next' => $layers->nextPageUrl(),
            ],
            'meta' => [
                'current_page' => $layers->currentPage(),
                'from' => $layers->firstItem(),
                'last_page' => $layers->lastPage(),
                'links' => $layers->links()->elements,
                'path' => $layers->url(1),
                'per_page' => $layers->perPage(),
                'to' => $layers->lastItem(),
                'total' => $layers->total(),
            ],
        ]);
    }

    public function show($id)
    {
        $model = Layer::findOrFail($id);

        return response()->json($model);
    }

    public function store(Request $request)
    {
        // 'geojson' é obrigatório, deve ser um arquivo e ter extensão .json ou .geojson
        $request->validate([
            'name' => 'required|max:100',
            'geojson' => 'required|file|mimes:json,geojson',
        ]);

        // Lê o conteúdo do arquivo GeoJSON enviado
        $content = file_get_contents($request->file('geojson')->getRealPath());
        // Converte o conteúdo JSON em um array associativo PHP
        $geojson = json_decode($content, true);

        // Verifica se o arquivo contém uma estrutura GeoJSON válida
        // O campo 'type' é obrigatório em um arquivo GeoJSON
        if (!isset($geojson['type'])) {
            return response()->json(['error' => 'GeoJSON inválido'], 400);
        }

        $layer = Layer::create([
            'name' => $request->name,
            'geometry' => $geojson,
        ]);

        return response()->json($layer, 201);
    }

    public function update(Request $request, $id)
    {
        $layer = Layer::findOrFail($id);

        // Validação básica: nome sempre obrigatório
        // 'geojson' para questão de edição não é obrigatório. Mas se enviado, deve ser um arquivo válido
        $request->validate([
            'name' => 'required|max:100',
            'geojson' => 'nullable|file|mimes:json,geojson',
        ]);

        $data = ['name' => $request->name];

        // Se enviou arquivo, processa e atualiza geometry
        if ($request->hasFile('geojson')) {
            $content = file_get_contents($request->file('geojson')->getRealPath());
            $geojson = json_decode($content, true);

            if (!isset($geojson['type'])) {
                return response()->json(['error' => 'GeoJSON inválido'], 400);
            }

            $data['geometry'] = $geojson;
        }

        $layer->update($data);

        return response()->json($layer);
    }

    public function destroy($id)
    {
        Layer::findOrFail($id)->delete();
        return response()->noContent();
    }

    public function geojson()
    {
        $layers = Layer::all();
        $allLayers = [];

        foreach ($layers as $layer) {
            $geojson = $layer->geometry;
            if (isset($geojson['features'])) {
                $allLayers[] = [
                    'id' => $layer->id,
                    'name' => $layer->name,
                    'features' => $geojson['features']
                ];
            }
        }

        return response()->json($allLayers);
    }


}
