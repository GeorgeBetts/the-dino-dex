<?php

namespace App\Http\Controllers;

use App\Http\Resources\DinosaurResource;
use App\Models\Dinosaur;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DinosaurController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @throws \Throwable
     */
    public function index(Request $request): Response
    {
        $dinosaurs = Dinosaur::with(['images', 'articles']);

        // Set whether searches on string fields will be 'like' or '=' (exact match)
        $whereOperator = 'like';
        if ($request->boolean('exact_match') === true) {
            $whereOperator = '=';
        }

        // Filter on dinosaur name
        if ($request->has('name')) {
            $nameSearch = ($whereOperator === '=') ? $request->name : '%'.$request->name.'%';
            $dinosaurs->where('name', $whereOperator, $nameSearch);
        }

        if ($request->boolean('has_wikipedia_entry') === true) {
            $dinosaurs->hasWikipediaEntry();
        }

        if ($request->boolean('has_image') === true) {
            $dinosaurs->hasImages();
        }

        if ($request->boolean('has_article') === true) {
            $dinosaurs->hasArticles();
        }

        return Inertia::render('dinosaurs/index', ['dinosaurs' => $dinosaurs->paginate(30)->toResourceCollection()]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Dinosaur $dinosaur): Response
    {
        $dinosaur = new DinosaurResource($dinosaur->load(['images', 'articles']));

        return Inertia::render('dinosaurs/show', ['dinosaur' => $dinosaur]);
    }
}
