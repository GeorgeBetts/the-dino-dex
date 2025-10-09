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
        if ($request->has('search')) {
            $searchString = ($whereOperator === '=') ? $request->search : '%'.$request->search.'%';
            $dinosaurs->where('name', $whereOperator, $searchString);
        }

        if ($request->boolean('has_wikipedia_entry', true) === true) {
            $dinosaurs->hasWikipediaEntry();
        }

        if ($request->boolean('has_image', true) === true) {
            $dinosaurs->hasImages();
        }

        if ($request->boolean('has_article') === true) {
            $dinosaurs->hasArticles();
        }

        $dinosaurs->orderBy('name');

        return Inertia::render('dinosaurs/Index', [
            'dinosaurs' => Inertia::scroll($dinosaurs->paginate(15)->toResourceCollection()),
            'initialSearch' => $request->search,
            'has_wikipedia_entry' => $request->has_wikipedia_entry,
            'has_image' => $request->has_image,
            'has_article' => $request->has_article,
            'exact_match' => $request->exact_match,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Dinosaur $dinosaur): Response
    {
        $dinosaur = new DinosaurResource($dinosaur->load(['images', 'articles']));

        return Inertia::render('dinosaurs/Show', ['dinosaur' => $dinosaur]);
    }
}
