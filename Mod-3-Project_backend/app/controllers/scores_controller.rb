class ScoresController < ApplicationController
  def index
      @scores = Score.all
      render json: @scores
  end
  def showScore
        @scores = Score.where(song_id: params[:song_id]).sort_by{|user| user.points}.reverse.first(5)
        render json: @scores
  end

  def show

      @score = Score.find_by(song_id: params[:id])

      render json: @score
  end

  def create
      @score = Score.create(score_params)
      render json: @score
  end

  private
  def score_params
      params.require(:score).permit(:name, :points, :song_id)
  end
end
